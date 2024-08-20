"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import CONTRACT_ADDRESSES from "@/constants/Addresses.json";
import abi from "../../contract_abis/WethReward.json";
import { Address } from "viem";
import { useReadContract } from "wagmi";

// Define types for the steps data
interface StepData {
  stepsData: number;
  startDate: Date;
  endDate: Date;
}

interface APIResponse {
  bucket: Array<{
    startTimeMillis: string;
    endTimeMillis: string;
    dataset: Array<{
      point: Array<{
        value: Array<{
          intVal?: number;
        }>;
      }>;
    }>;
  }>;
}

export default function FitnessData({ steps, setSteps, setTimestamp }: any) {
  const { data: session } = useSession();

  function parseStepsData(data: APIResponse): StepData[] {
    return data.bucket.map((bucket: any) => {
      const stepsData = bucket.dataset[0].point[0]?.value[0]?.intVal || 0;
      const startDate = new Date(parseInt(bucket.startTimeMillis, 10));
      const endDate = new Date(parseInt(bucket.endTimeMillis, 10));
      return {
        stepsData,
        startDate,
        endDate,
      };
    });
  }

  function getPreviousMidnightTimestamps() {
    // Get the current date in UTC
    let now = new Date();

    // Calculate the current 12:00 AM UTC (start of today)
    let current12AM = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );

    // Calculate the previous 12:00 AM UTC (start of yesterday)
    let previous12AM = new Date(current12AM.getTime() - 24 * 60 * 60 * 1000);

    // Return the timestamps in milliseconds
    return {
      current12AM: current12AM.getTime(),
      previous12AM: previous12AM.getTime(),
    };
  }

  useEffect(() => {
    if (session?.accessToken) {
      let timestamps = getPreviousMidnightTimestamps();
      const fetchStepsData = async () => {
        const endTimeMillis = timestamps.current12AM;
        const startTimeMillis = timestamps.previous12AM;

        try {
          const response = await fetch(
            "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                aggregateBy: [
                  {
                    dataTypeName: "com.google.step_count.delta",
                    dataSourceId:
                      "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
                  },
                ],
                bucketByTime: { durationMillis: 86400000 },
                startTimeMillis: startTimeMillis,
                endTimeMillis: endTimeMillis,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = await response.json();
          console.log("Session token:", session.accessToken);
          console.log("Response:", data);
          const parsedData = parseStepsData(data);
          console.log(parsedData);
          setTimestamp(timestamps.previous12AM);
          setSteps(parsedData[0].stepsData);
        } catch (error) {
          console.error("Error fetching steps data:", error);
        }
      };

      fetchStepsData();
    }
  }, [session]);

  return (
    <>
      <p className="text-center text-3xl">No. of steps {steps ? steps : ""}</p>
    </>
  );
}

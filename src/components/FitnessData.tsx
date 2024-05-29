"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react"

// Define types for the steps data
interface StepData {
  steps: number;
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

export default function FitnessData() {

  const [stepsData, setStepsData] = useState<StepData[]>([]);
    const { data: session } = useSession();


    function parseStepsData(data: APIResponse): StepData[]  {
        return data.bucket.map((bucket: any) => {
          console.log(session?.accessToken)  // For testing purposes
          const steps = bucket.dataset[0].point[0]?.value[0]?.intVal || 0;
          const startDate = new Date(parseInt(bucket.startTimeMillis, 10));
          const endDate = new Date(parseInt(bucket.endTimeMillis, 10));
          return {
            steps,
            startDate,
            endDate
          };
        });
      }
      

      useEffect(() => {
        if (session?.accessToken) {
          const fetchStepsData = async () => {
            const now = new Date();
            const startTimeMillis = now.setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000;
            const endTimeMillis = Date.now();
    
            try {
              const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${session.accessToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "aggregateBy": [{
                    "dataTypeName": "com.google.step_count.delta",
                    "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                  }],
                  "bucketByTime": { "durationMillis": 86400000 },
                  "startTimeMillis": startTimeMillis,
                  "endTimeMillis": endTimeMillis,
                }),
              });
    
              if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
              }
    
              const data = await response.json();
              const parsedData = parseStepsData(data);
              console.log(parsedData)
              setStepsData(parsedData);
            } catch (error) {
              console.error('Error fetching steps data:', error);
            }
          };
    
          fetchStepsData();
        }
      }, [session]);

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex flex-row">
                    <p>No. of steps</p>
                    {stepsData.length ? (<p>{stepsData[stepsData.length - 1].steps}</p>) : (<></>)}
                </div>
                <div className="flex flex-row">
                    <p>Distance Covered</p>
                    <p>9.5 KM</p>
                </div>
                <div className="flex flex-row">
                    <p>Target Completion</p>
                    <p>10000KM</p>
                </div>
            </div>
        </>
    )
}
import Image from "next/image";

export default function List () {
    <div>
        <p>List items</p>
        {/* <Image /> */}
        <div>
            <p>Price:</p>
            <input type="number" placeholder="10" min={0} />
        </div>
        <div>
            <p>Reward:</p>
            <div>
                <input type="number" placeholder="1" min={0} />
                <p>RB</p>
            </div>
            <p>per</p>
            <div>
                <input type="number" placeholder="10" min={0}/>
                <p>KM</p>
            </div>
        </div>
        <p>Platform fee: 10%</p>
        <button>LIST</button>
    </div>
}
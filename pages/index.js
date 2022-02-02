import axios from 'axios'
import { useState } from 'react'

export default function Home() {

    const [map, setMap] = useState([])

    async function handleStart() {
        const response = await axios.get('/api/map');
        setMap(response.data);
    }

    async function move(direction) {
        const response = await axios.post('/api/map', {
            map,
            direction,
        });

        setMap(response.data);
    }

    return (
        <div>
            {map.length == 0 ?
                <button onClick={handleStart}>START</button>
                :
                <div>
                    <table>
                        <tbody>
                            {map.map((item, index) => (
                                <tr key={index}>
                                    {map[index].map((value, j) => (
                                        <td key={index + ':' + j} className={value == 1 ? "red" : "gray"}>
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={() => move("up")}>up</button>
                        <button onClick={() => move("down")}>down</button>
                        <button onClick={() => move("left")}>left</button>
                        <button onClick={() => move("right")}>right</button>
                    </div>
                </div>
            }


        </div>
    )
}

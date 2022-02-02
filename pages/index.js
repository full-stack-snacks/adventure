import axios from 'axios'
import { useState } from 'react'

export default function Home() {

    const [map, setMap] = useState([])
    const [player, setPlayer] = useState();
    const [description, setDescription] = useState('');

    function getStyle(i, j) {

        const styles = ["empty", "wall", "key", "trap", "door", "player"]


        if (i == player.y && j == player.x) {
            return "player";
        } else {
            const value = map[i][j];
            return styles[parseInt(value)]
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const command = event.target.command.value;
        doCommand(command);
    }

    async function doCommand(command) {
        const response = await axios.post('/api/command', {
            command,
            player,
            map,
        });

        setPlayer(response.data.player);
        setDescription(response.data.description);
        setMap(response.data.map);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input name="command" />
                <button>SEND</button>
            </form>

            <section>
                <p>{description}</p>
            </section>
            {map.length == 0 ?
                <p>Waiting...</p>
                :
                <div>
                    <table>
                        <tbody>
                            {map.map((_, i) => (
                                <tr key={i}>
                                    {map[i].map((_, j) => (
                                        <td key={i + ':' + j} className={getStyle(i, j)}>

                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }


        </div>
    )
}

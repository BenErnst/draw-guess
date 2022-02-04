import { socketService } from '../services/socketService';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loadPlayer } from '../store/actions/playerActions';
import { useEffectUpdate } from '../hooks/useEffectUpdate';

export const Waiting = () => {
    const { currSession } = useSelector((state) => state.gameModule);

    const { player } = useSelector((state) => state.playerModule);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isDrawerArrived, setIsDrawerArrived] = useState(true);

    useEffect(() => {
        if (player.type === 'guesser') {
            socketService.on('drawer arrived', () => {
                console.log('drawer arrived');
                setIsDrawerArrived(true);
            });

            socketService.on('drawer is ready to play', () => {
                console.log('drawer is ready to play');
                history.push('/drawing');
            });
        }

        if (player.type === 'drawer') {
            socketService.on('guesser is ready to play', () => {
                console.log('guesser is ready to play');
                history.push('/word-choosing');
            });
        }
    }, []);

    const guesserReadyFunc = () => {
        socketService.emit('guesser is ready to play');
        setIsDrawerArrived(false);
    };

    // useEffectUpdate(() => {
    //     const path = player.type === 'drawer' ? '/word-choosing' : '/drawing';
    //     history.push(path);
    // }, [player]);

    return (
        <section>
            <p>Waiting View</p>
            {player.type === 'drawer' ? (
                <h2>Wait for a Guesser</h2>
            ) : (
                <div>
                    <h2>You need to guess...(instructions)</h2>
                    {isDrawerArrived && (
                        <button onClick={guesserReadyFunc}>Click Here if you are ready</button>
                    )}
                </div>
            )}
        </section>
    );
};

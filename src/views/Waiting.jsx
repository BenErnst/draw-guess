import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loadPlayer } from '../store/actions/playerActions';
import { useEffectUpdate } from '../hooks/useEffectUpdate';

export const Waiting = () => {
    const { player } = useSelector((state) => state.playerModule);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadPlayer());
    }, []);

    useEffectUpdate(() => {
        const path = player.type === 'drawer' ? '/word-choosing' : '/drawing';
        history.push(path);
    }, [player]);

    return player ? (
        <section>
            <p>Waiting View</p>
            {player.type === 'drawer' ? (
                <h2>Wait for a Guesser</h2>
            ) : (
                <h2>Drawer is Picking a Word...</h2>
            )}
        </section>
    ) : (
        <img src={require(`../assets/img/loading.gif`)} className="loading-gif" />
    );
};

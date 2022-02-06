import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToggle } from '../hooks/useToggle';
import { socketService } from '../services/socketService';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

export const Waiting = () => {
    const { player } = useSelector((state) => state.playerModule);
    const history = useHistory();

    const [isDrawerArrived, setIsDrawerArrived] = useToggle(true);

    useEffect(() => {
        if (!player) return;
        if (player.type === 'guesser') {
            socketService.on('drawer arrived', () => {
                setIsDrawerArrived(true);
            });
            socketService.on('drawer is ready to play', () => {
                history.push('/drawing');
            });
        }
        if (player.type === 'drawer') {
            socketService.on('guesser is ready to play', () => {
                history.push('/word-choosing');
            });
        }
    }, []);

    const guesserReadyFunc = () => {
        socketService.emit('guesser is ready to play');
        setIsDrawerArrived(false);
    };

    const playerAvatar = (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
        >
            <Avatar src={`https://i.pravatar.cc/300`} className="player-avatar" />
        </StyledBadge>
    );

    return player ? (
        <section className="waiting-container">
            {player.type === 'drawer' ? (
                <div>
                    {playerAvatar}
                    <h2>Waiting for a Guesser...</h2>
                    <img src={require(`../assets/img/waiting.gif`)} className="loading-gif" />
                </div>
            ) : (
                <div>
                    {isDrawerArrived ? (
                        <div>
                            {playerAvatar}
                            <h3>Are you Ready?</h3>
                            <button onClick={guesserReadyFunc}>Click Here</button>
                        </div>
                    ) : (
                        <div>
                            {playerAvatar}
                            <h2>The Drawer is picking a word...</h2>
                            <img
                                src={require(`../assets/img/waiting.gif`)}
                                className="loading-gif"
                            />
                        </div>
                    )}
                </div>
            )}
        </section>
    ) : (
        <button onClick={() => history.push('/')} style={{ padding: '5px' }}>
            Back Home
        </button>
    );
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: -1,
            left: -1,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

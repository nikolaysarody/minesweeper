import { GameField } from '../../../widgets/GameField';
import { Information } from '../../../widgets/Information';
import styles from './MainPage.module.scss';

export const MainPage = () => {
    return (
        <div className={styles.MainPage}>
            <div className={styles.inside}>
                <Information />
                <hr className={styles.center} />
                <GameField />
            </div>
        </div>
    );
};

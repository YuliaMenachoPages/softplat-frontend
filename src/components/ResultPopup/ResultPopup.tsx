import {FC} from 'react';
import { ToggleButton } from '../UI/ToggleButton/ToggleButton';
import styles from '../UI/Popup/Popup.module.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import { popupState } from '../UI/Popup/PopupSlice';
import { chooseRoleState } from '../UI/ChooseRole/ChooseRoleSlice';
import { PopupForAuth } from '../AuthPopup/AuthPopup';
import { RecoverPasswordPopup } from '../RecoverPasswordPopup/RecoverPasswordPopup';
import { PopupForReg } from '../RegPopup/RegPopup';

export const ResultPopup : FC = () =>{
    const toggleState = useSelector((state: RootState) => state.toggleBtn.value);
    const MyRole = useSelector((state: RootState) => state.chooseRole.title);
    const dispatch = useDispatch();
	const isOpened =  useSelector((state: RootState) => state.popupOpen.setIsOpened)
	const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (evt) => {
		if (evt.target === evt.currentTarget) {
			dispatch(popupState(false));
			dispatch(chooseRoleState('Я покупатель'))
		}
	};
    
    return (
        <div onClick={handleOverlayClick} className={classNames(styles.popup, isOpened ? styles.popup_opened : '')}>
            <div className={styles.popup__container}>
                <h2 className={styles.popup__role}>{MyRole}</h2>
                <ToggleButton/>
                {!toggleState ? 
                    (MyRole==='Забыли пароль?' ? <RecoverPasswordPopup/>: <PopupForAuth/>) : 
                    (MyRole==='Забыли пароль?' ? <RecoverPasswordPopup/>: <PopupForReg/>)}
            </div>
        </div>
    )
}

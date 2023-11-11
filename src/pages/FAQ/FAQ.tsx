import { AccordionButton } from "../../components/UI/AccordionButton/AccordionButton";
import {FC} from 'react';
import { FAQ_INFO } from "../../utils/constants";
import styles from './FAQ.module.scss';

export const FAQ: FC =() =>{
    return (
        <ul className={styles.list}>
        {FAQ_INFO.map((i)=>{
            return(
                <li key={i.id} className={styles.list__item}>
                    <AccordionButton question={i.question} answer={i.answer}/>
                </li>
            )
        })}
        </ul>
    )
}

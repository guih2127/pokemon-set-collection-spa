import { Progress, Statistic } from "antd";
import Spinner from "./SpinnerComponent";

const CollectionStatistcsComponent = ({ percentage, cardsObtained, totalCards, loading }) => {

    if (!loading) {
        return (
            <div style={{textAlign: 'center'}}>
                <Progress
                    type="circle"
                    percent={percentage}
                    format={percent => `${percent}% da coleção completa`}
                    width='30vh'
                />
                <Statistic 
                    title="Cards obtidos" 
                    value={cardsObtained} 
                    suffix={`/${totalCards}`}
                    style={{margin: '1vh'}}
                />
            </div>
        )
    }

    return <Spinner />
};

export default CollectionStatistcsComponent;
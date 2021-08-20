import { Progress, Statistic } from "antd";

const CollectionStatistcsComponent = ({ percentage, cardsObtained, totalCards }) => {

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
};

export default CollectionStatistcsComponent;
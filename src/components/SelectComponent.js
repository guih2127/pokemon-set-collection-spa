import { Select } from 'antd';

const { Option } = Select;

const SelectComponent = ({ label, options, setSelectedOption, selectedOption }) => {
    const renderOptions = options.map(option => {
        return (
            <Option 
                key={option.id} 
                value={option.id}
            >
                {option.name}
            </Option> 
        );
    });

    const onChange = id => {
        const option = options.find(
            option => option.id === id
        );

        setSelectedOption(option);
    };

    return (
        <div>
            <Select
                showSearch
                defaultValue={selectedOption}
                style={{ width: 200 }}
                placeholder={label}
                optionFilterProp="children"
                onChange={id => onChange(id)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {renderOptions}
            </Select>
        </div>
    )
};

export default SelectComponent;
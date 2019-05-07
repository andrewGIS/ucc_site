export const loaded_data = {
    groups: [
        {
            name: "Climate_terms_3_hours_data_focal",
            alias: "Климатические показатели 3-х часовые",
            indicators: [
                {
                    name: "Mean_pressure",
                    alias:"Среднее давление",
                    periods:['1981_2010', '1971_2000'],
                    months:['jul', 'year', 'oct', 'apr', 'jan'],
                    style:"None"

                },
                {
                    name:"Mean_wind",
                    alias:"Средння скорость ветра",
                    periods:['1981_2010', '1971_2000'],
                    months:['jul', 'year', 'oct', 'apr', 'jan'],
                    style:"None"
                }
            ]
        }
    ]
}
export default loaded_data;
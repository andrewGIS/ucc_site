export const loaded_data = {
    groups: [
        {
            name: "Climate_terms_3_hours_data_focal",
            alias: "Климатические показатели 3-х часовые",
            indicators: [
                {
                    name: "Mean_pressure",
                    alias:"Среднее давление",
                    periods:['1971_2000','1981_2010'],
                    months:['jul', 'year', 'oct', 'apr', 'jan'],
                    style:"raster",
                    postfix_in_file:"focal.tif"

                },
                {
                    name:"Mean_wind",
                    alias:"Средняя скорость ветра",
                    periods:['1971_2000','1981_2010'],
                    months:['year','jan','apr', 'jul', 'oct'],
                    style:"raster",
                    postfix_in_file:"with_h_focal.tif"
                },
                {
                    name:"Max_prec_df",
                    alias:"Максимальное число осадков",
                    periods:['1966_1995', '1971_2000','1976_2005', '1986_2015', '1981_2010'],
                    months:['None'],
                    style:"ucc:T_ave_year",
                    postfix_in_file:"with_h_focal.tif"
                }
            ]
        }
    ]
}
export default loaded_data;
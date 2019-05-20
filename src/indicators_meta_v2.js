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
                    style:"ucc:mean_wind",
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
        },
        {
            name: "Days_data_AISORI_focal",
            alias: "Дни какие-то",
            indicators: [
                {
                    name: "T_mean_min_year",
                    alias:"Средняя минимальная температура",
                    periods:['1951_1980', '1961_1990', '1971_2000', '1981_2010'],
                    months:['None'],
                    style:"raster",
                    postfix_in_file:"with_curv_foc.tif"

                },
                {
                    name: "T_mean_max_year",
                    alias:"Средняя максимальная температура",
                    periods:['1951_1980', '1961_1990', '1971_2000', '1981_2010'],
                    months:['None'],
                    style:"raster",
                    postfix_in_file:"with_lat_long_h_foc.tif"

                }
            ]
        }
    ]
}
export default loaded_data;
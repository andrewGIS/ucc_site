
/* 1. group - is logical grop for union indicators
group contains one or more climatic indicators
group have name and alias it changes in code
2. this inforamtioin is used in lister component
for build list of avivable indicators
indicators is objest that desribes one climatic
3. link with data on geoserver is throw name of raster file

name_of_indicator_period_month_postfix.tif

T_mean_min_year_1981_2010_month_with_curv_foc.tif

|T_mean_min|_|1981_2010|_|year|_|with_curv_foc|.tif

indicator sample object
// {
        name: "Имя идникатора"  "Mean_pressure" так как написано в имени файла
        alias: "Псевдоним" "Среднее давление" так как показатель будет отображаться в списке
        periods: "Доступыне периоды" "['jul', 'year', 'oct', 'apr', 'jan']" доступные периоды для показатаеля
                сооствествующие растры должны быть опубликованы
                на геосервере. В коде пишутся правила перехода к нормальному виду (jan -> Январь)
                компонент Lister, вычисляемое свойство aviable_months
                доступные месяцы доступны пользователю для выбора
                может быть None
        style: "ucc:mean_wind" стиль на геосервере для отображения растра
        postfix_in_file: "with_h_focal.tif" окончание растрового файла (указывает нарахные методы построения)
    }

*/

export const allMetadata = {
  groups: [{
    name: '1_Mean_year_month_climatic_charactreristic',
    alias: 'Средние многолетние климатические характеристики',
    indicators: [{
      alias: 'Продолжительность залегания снежного покрова',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом зависимости от высоты местности на основе цифровой модели рельефа',
        methodLink: ''
      }],
      name: 'Day_with_show',
      periods: ['year'],
      style: 'ucc:Day_with_snow',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетнeе парциальное давление водяного пара  (влажность воздуха) по месяцам',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа и данных ERA-Interim по по температуре и относительной влажности воздуха на изобарической поверхности 850 гПа.',
        methodLink: 'https://geocartography.ru/scientific_article/2019_1_3-12'
      }],
      name: 'Hum_average_monthly',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep'],
      style: 'ucc:Humidity',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетнее годовое парциальное давление водяного пара (влажность воздуха)',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа и данных ERA-Interim по по температуре и относительной влажности воздуха на изобарической поверхности 850 гПа.',
        methodLink: 'https://geocartography.ru/scientific_article/2019_1_3-12'
      }],
      name: 'Hum_average_year',
      periods: ['year'],
      style: 'ucc:Humidity',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетнее давление по месяцам',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция методом Spline with Tension',
        methodLink: ''
      }],
      name: 'Mean_pressure_monthly',
      periods: ['apr', 'jan', 'jul', 'oct'],
      style: 'ucc:Pressure',
      years: ['1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетнее давление',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция методом Spline with Tension',
        methodLink: ''
      }],
      name: 'Mean_pressure_year',
      periods: ['year'],
      style: 'ucc:Pressure',
      years: ['1971_2000', '1981_2010']
    },
    {
      alias: 'Средняя многолетняя годовая скорость ветра',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом зависимости от высоты местности на основе цифровой модели рельефа',
        methodLink: ''
      }],
      name: 'Mean_wind',
      periods: ['apr', 'jan', 'jul', 'oct', 'year'],
      style: 'ucc:Wind',
      years: ['1971_2000', '1981_2010']
    },
    {
      alias: 'Среднемноголетняя сумма  осадков холодного периода',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом зависимости от высоты местности, а также от уклона и экспозиции макросклонов на основе цифровой модели рельефа. Высотная зависимость определена на основе данных сети метеостанций Уральского УГМС',
        methodLink: 'https://geocartography.ru/scientific_article/2019_1_3-12 '
      }],
      name: 'Prec_average_cold',
      periods: ['cold'],
      style: 'ucc:Precipitation',
      years: ['1966_1995', '1971_2000', '1976_2005', '1981_2010', '1986_2015']
    },
    {
      alias: 'Среднемноголетняя сумма  осадков теплого периода',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом зависимости от высоты местности, а также от уклона и экспозиции макросклонов на основе цифровой модели рельефа. Высотная зависимость определена на основе данных сети метеостанций Уральского УГМС',
        methodLink: 'https://geocartography.ru/scientific_article/2019_1_3-12 '
      }],
      name: 'Prec_average_warm',
      periods: ['warm'],
      style: 'ucc:Precipitation',
      years: ['1966_1995', '1971_2000', '1976_2005', '1981_2010', '1986_2015']
    },
    {
      alias: 'Среднемноголетняя годовая сумма осадков',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом зависимости от высоты местности, а также от уклона и экспозиции макросклонов на основе цифровой модели рельефа. Высотная зависимость определена на основе данных сети метеостанций Уральского УГМС',
        methodLink: 'https://geocartography.ru/scientific_article/2019_1_3-12 '
      }],
      name: 'Prec_average_year',
      periods: ['year'],
      style: 'ucc:Precipitation',
      years: ['1966_1995', '1971_2000', '1976_2005', '1981_2010', '1986_2015']
    },
    {
      alias: 'Среднемесячная температура воздуха',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа и данных ERA-Interim по температуре на изобарической поверхности 850 гПа',
        methodLink: 'https://geocartography.ru/scientific_article/2019_1_3-12'
      }],
      name: 'T_average_monthly',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep'],
      style: 'ucc:Temperature',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Среднегодовая температура воздуха',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа и данных ERA-Interim по температуре на изобарической поверхности 850 гПа',
        methodLink: 'https://geocartography.ru/scientific_article/2019_1_3-12'
      }],
      name: 'T_average_year',
      periods: ['year'],
      style: 'ucc:Temperature',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    }]
  },
  {
    name: '2_Extremal_climatic_charactreristic',
    alias: 'Экстремальные климатические характеристики',
    indicators: [{
      alias: 'Повторяемость экстремальных значений (1% повторяемости) суточных сумм осадков (дней/10 лет)',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция методом сплайна с натяжением',
        methodLink: ''
      }],
      name: 'Extr_prec_day_count_1_proc_10years',
      periods: ['none'],
      style: 'ucc:Extr_prec_day_count_1_proc',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: 'Повторяемость экстремальных значений (1% повторяемости) суммы осадков холодного периода (дней/10 лет) ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция методом сплайна с натяжением',
        methodLink: ''
      }],
      name: 'Extr_prec_winter_day_count_1_proc_10years',
      periods: ['none'],
      style: 'ucc:Extr_prec_winter_day_count_1_proc',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: 'Средний многолетний максимум осадков за 12 ч.',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Max_prec_df',
      periods: ['none'],
      style: 'ucc:Max_prec_df',
      years: ['1966_1995', '1971_2000', '1976_2005', '1981_2010', '1986_2015']
    },
    {
      alias: 'Средний многолетний максимум высоты снежного покрова ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Max_snow_mean',
      periods: ['none'],
      style: 'ucc:Max_snow_mean',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Среднее многолетнее число дней подряд без осадков (продолжительность засушливого периода)',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом зависимости от общей кривизны поверхности на основе цифровой модели рельефа',
        methodLink: ''
      }],
      name: 'NoPrec_mean_summer',
      periods: ['none'],
      style: 'ucc:NoPrec_mean_summer',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: 'Пороговые значения (1% повторяемости) суточной суммы осадков ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом зависимости от общей кривизны поверхности на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Prec_1_proc',
      periods: ['none'],
      style: 'ucc:Prec_1_proc',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: 'Повторяемость сильных осадков более 30 мм/сутки',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа и данных о среднегодовом суточном максимуме осадков',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Prec_huge_10years',
      periods: ['none', 'year'],
      style: 'ucc:Prec_huge',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: 'Средний многолетний суточный максимум осадков ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Prec_mean_max_day',
      periods: ['none'],
      style: 'ucc:Max_prec_df',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: 'Пороговые значения (1% повторяемости) суммы осадков холодного периода ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Prec_winter_1_proc',
      periods: ['none'],
      style: 'ucc:Prec_winter_1_proc',
      years: ['1966_1995', '1976_2005', '1986_2015']
    },
    {
      alias: 'Повторяемость температур выше +30°C ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'T_count_max_year_10years',
      periods: ['none', 'year'],
      style: 'ucc:T_count_max_year',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Повторяемость температур ниже -30°C ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом зависимости от общей кривизны поверхности на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'T_count_min_year_10years',
      periods: ['none', 'year'],
      style: 'ucc:T_count_min_year',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Пороговые значения (1% повторяемости) максимальной температуры воздуха ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: '-'
      }],
      name: 'T_max_sum_1_proc',
      periods: ['none'],
      style: 'T_max_sum_1_proc',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Повторяемость экстремальных значений (1% повторяемости) максимальной температуры воздуха',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция методом сплайна с натяжением',
        methodLink: '-'
      }],
      name: 'T_max_sum_day_count_1_proc_10years',
      periods: ['none'],
      style: 'T_max_sum_day_count_1_proc',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Средний многолетний максимум температуры воздуха ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'T_mean_max_year',
      periods: ['none'],
      style: 'ucc:Temperature',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Средний многолетний минимум температуры воздуха ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'T_mean_min_year',
      periods: ['none'],
      style: 'ucc:Temperature',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Пороговые значения (1% повторяемости) минимальной температуры воздуха ',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Множественная линейная регрессия по трем независимым переменным (широта, долгота, высота местности)  на основе цифровой модели рельефа',
        methodLink: '-'
      }],
      name: 'T_min_win_1_proc',
      periods: ['none'],
      style: 'ucc:T_min_win_1_proc',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    },
    {
      alias: 'Повторяемость экстремальных значений (1% повторяемости) минимальной температуры воздуха',
      desc: [{
        source: 'http://aisori.meteo.ru/ClimateR',
        spatialRes: '3 км/пиксель',
        countStations: 99,
        method: 'Интерполяция методом сплайна с натяжением',
        methodLink: '-'
      }],
      name: 'T_min_win_day_count_1_proc_10years',
      periods: ['none'],
      style: 'ucc:T_min_win_day_count_1_proc',
      years: ['1951_1980', '1961_1990', '1971_2000', '1981_2010']
    }]
  },
  {
    name: '3_USSR_climat_guide',
    alias: 'Данные из научно-прикладного справочника по климату CCCР',
    indicators: [{
      alias: 'Среднемноголетний максимум высоты снежного покрова ',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Average_max_snow_depth',
      periods: ['none'],
      style: 'ucc:Max_snow_mean',
      years: ['1951_1980']
    },
    {
      alias: 'Среднемноголетнее число дней с метелями в году',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Blizzard',
      periods: ['none'],
      style: 'ucc:Blizzard_days',
      years: ['1951_1980']
    },
    {
      alias: 'Среднее многолетнее значениеобщей облачности в баллах',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Cloud_cover',
      periods: ['apr', 'jan', 'jul', 'oct', 'year'],
      style: 'ucc:Cloud_cover',
      years: ['1951_1980']
    },
    {
      alias: 'Среднемноголетнее число дней с градом в году',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Hail_days',
      periods: ['none'],
      style: 'ucc:Hail_days',
      years: ['1951_1980']
    },
    {
      alias: 'Среднемноголетнее число дней с гололедом в году',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Ice_accum_days',
      periods: ['none'],
      style: 'ucc:Ice_accum_days',
      years: ['1951_1980']
    },
    {
      alias: 'Повторяемость сильных осадков более 30 мм/сутки',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Prec_days_more_30mm_10years',
      periods: ['none', 'year'],
      style: 'ucc:Prec_huge',
      years: ['1951_1980']
    },
    {
      alias: 'Суточный максимум осадков 1% обеспеченности ',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Prec_max_day_year_1_perc',
      periods: ['none', 'year'],
      style: 'ucc:Prec_max_day_year_1_perc',
      years: ['1951_1980']
    },
    {
      alias: 'Суточный максимум осадков 5% обеспеченности ',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Prec_max_day_year_5_perc',
      periods: ['none', 'year'],
      style: 'ucc:Prec_max_day_year_5_perc',
      years: ['1951_1980']
    },
    {
      alias: 'Среднемноголетнее годовое значение относительной влажности воздуха',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Humidity_relative',
      periods: ['apr', 'jan', 'jul', 'oct', 'year'],
      style: '',
      years: ['1951_1980']
    },
    {
      alias: 'Продолжительность залегания снежного покрова ',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Snow_cover_days',
      periods: ['none'],
      style: 'ucc:Day_with_snow',
      years: ['1951_1980']
    },
    {
      alias: 'Средний многолетний запас воды в снежном покрове',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'SWE_with_h',
      periods: ['none'],
      style: 'ucc:SWE',
      years: ['1951_1980']
    },
    {
      alias: 'Среднемноголетнее число дней с грозами в году ',
      desc: [{
        source: 'https://vk.com/topic-140076474_35041690',
        spatialRes: '3 км/пиксель',
        countStations: 108,
        method: 'Иинтерполяция с учетом высотной зависимости на основе цифровой модели рельефа',
        methodLink: 'http://intercarto.msu.ru/jour/article.php?articleId=711&lang=ru'
      }],
      name: 'Thunderstorm_days',
      periods: ['none'],
      style: 'ucc:Thunderstorm_days',
      years: ['1951_1980']
    }]
  },
  {
    name: '4_Agro_atlas',
    alias: 'Данные из агроэкологического атласа РФ',
    indicators: [{
      alias: 'Абсолютный минимум температуры воздуха',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'ABS_MIN_T',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Temperature',
      years: ['before1965']
    },
    {
      alias: ' ГТК Селянинова',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'GTK',
      periods: ['aug', 'jul', 'jun'],
      style: 'ucc:GTK',
      years: ['before1965']
    },
    {
      alias: 'Cредняя многолетняя относительная влажность воздуха',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Humidity_relative',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Humidity_relative',
      years: ['before1965']
    },
    {
      alias: 'Cреднее многолетнее количество осадков холодного периода',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Precipitation_avg_cold',
      periods: ['cold'],
      style: 'ucc:Precipitation',
      years: ['before1965']
    },
    {
      alias: 'Среднее многолетнее количество осадков теплого периода',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Precipitation_avg_warm',
      periods: ['warm'],
      style: 'ucc:Precipitation',
      years: ['before1965']
    },
    {
      alias: 'Дата установления снежного покрова',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Snow_begin',
      periods: ['none'],
      style: 'ucc:Snow_begin',
      years: ['before1965']
    },
    {
      alias: 'Продолжительность залегания снежного покрова',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Snow_days',
      periods: ['none'],
      style: 'ucc:Day_with_snow',
      years: ['before1965']
    },
    {
      alias: 'Дата схода снежного покрова',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Snow_end',
      periods: ['none'],
      style: 'ucc:Snow_end',
      years: ['before1965']
    },
    {
      alias: 'Среднемноголетний максимум высоты снежного покрова ',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Snow_maxim',
      periods: ['none'],
      style: 'ucc:Max_snow_mean',
      years: ['before1965']
    },
    {
      alias: 'Cредняя многолетняя температура воздуха',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Temperature_avg',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Temperature',
      years: ['before1965']
    },
    {
      alias: 'Cреднемноголетняя максимальная температура воздуха',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Temperature_max',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Temperature',
      years: ['before1965']
    },
    {
      alias: 'Среднемноголетняя минимальная температура воздуха',
      desc: [{
        source: 'http://www.agroatlas.ru/ru/content/Climatic_maps/index.html',
        spatialRes: '10 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: '-'
      }],
      name: 'Temperature_min',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Temperature',
      years: ['before1965']
    }]
  },
  {
    name: '5_World_clim_data',
    alias: 'Данные проекта WorldClim 2.0',
    indicators: [{
      alias: 'Количество осадков',
      desc: [{
        source: 'https://worldclim.org/data/worldclim21.html',
        spatialRes: '1 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: 'https://rmets.onlinelibrary.wiley.com/doi/full/10.1002/joc.5086 '
      }],
      name: 'Prec',
      periods: ['cold', 'warm', 'year'],
      style: 'ucc:Precipitation',
      years: ['1971_2000']
    },
    {
      alias: 'Солнечная радиация по месяцам и за год',
      desc: [{
        source: 'https://worldclim.org/data/worldclim21.html',
        spatialRes: '1 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: 'https://rmets.onlinelibrary.wiley.com/doi/full/10.1002/joc.5086 '
      }],
      name: 'Srad',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:wc2_0_30s_srad',
      years: ['1971_2000']
    },
    {
      alias: 'Среднегодовая температура воздуха',
      desc: [{
        source: 'https://worldclim.org/data/worldclim21.html',
        spatialRes: '1 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: 'https://rmets.onlinelibrary.wiley.com/doi/full/10.1002/joc.5086 '
      }],
      name: 'T_average',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Temperature',
      years: ['1971_2000']
    },
    {
      alias: 'Среднегодовая максимальная температура',
      desc: [{
        source: 'https://worldclim.org/data/worldclim21.html',
        spatialRes: '1 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: 'https://rmets.onlinelibrary.wiley.com/doi/full/10.1002/joc.5086 '
      }],
      name: 'T_max',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Temperature',
      years: ['1971_2000']
    },
    {
      alias: 'Среднегодовая минимальная температура',
      desc: [{
        source: 'https://worldclim.org/data/worldclim21.html',
        spatialRes: '1 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: 'https://rmets.onlinelibrary.wiley.com/doi/full/10.1002/joc.5086 '
      }],
      name: 'T_min',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Temperature',
      years: ['1971_2000']
    },
    {
      alias: 'Парциальное давление водяного пара',
      desc: [{
        source: 'https://worldclim.org/data/worldclim21.html',
        spatialRes: '1 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: 'https://rmets.onlinelibrary.wiley.com/doi/full/10.1002/joc.5086 '
      }],
      name: 'V_apr',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Humidity',
      years: ['1971_2000']
    },
    {
      alias: 'Среднегодовая скорость метра',
      desc: [{
        source: 'https://worldclim.org/data/worldclim21.html',
        spatialRes: '1 км/пиксель',
        countStations: '-',
        method: '-',
        methodLink: 'https://rmets.onlinelibrary.wiley.com/doi/full/10.1002/joc.5086 '
      }],
      name: 'Wind',
      periods: ['apr', 'aug', 'dec', 'feb', 'jan', 'jul', 'jun', 'mar', 'may', 'nov', 'oct', 'sep', 'year'],
      style: 'ucc:Wind',
      years: ['1971_2000']
    }]
  }]
}
export default allMetadata

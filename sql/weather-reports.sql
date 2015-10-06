Create Table WeatherReports (
  sol int not null primary key,
  ls float,
  mintemp float,
  maxtemp float,
  pressure float,
  humidity float,
  windspeed float,
  winddirection varchar(20),
  weather varchar(20),
  season varchar(20),
  terrestrialdate date,
  sunrise timestamp,
  sunset timestamp
);

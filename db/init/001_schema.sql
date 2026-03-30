CREATE DATABASE gym_pro;

CREATE TABLE User (
    [User ID]         INTEGER PRIMARY KEY AUTOINCREMENT
                              UNIQUE
                              NOT NULL,
    [User name]       TEXT    NOT NULL,
    [User type]       TEXT    NOT NULL,
    [Email]             TEXT    NOT NULL,
    [Phone number]    INTEGER NOT NULL,
    [Membership type] TEXT    NOT NULL
);

CREATE TABLE Schedule (
    [ScheduleInstanceID]  INTEGER NOT NULL
                                PRIMARY KEY AUTOINCREMENT,
    [User ID (member)]  TEXT    REFERENCES User ([User ID]) 
                                NOT NULL,
    [User ID (trainer)] TEXT    REFERENCES User ([User ID]) 
                                NOT NULL,
    [Date/time]         DATETIME    NOT NULL
);

CREATE TABLE Parking (
    [ParkingInstanceID] INTEGER PRIMARY KEY AUTOINCREMENT
                              UNIQUE
                              NOT NULL,
    [User ID]         INTEGER REFERENCES User ([User ID]) 
                              NOT NULL,
    [License plate]   TEXT    NOT NULL,
    [Payment]           NUMERIC NOT NULL,
    [Start timestamp] DATETIME NOT NULL,
    [End timestamp]   DATETIME NOT NULL
);

CREATE TABLE [Credit Card Information] (
    CreditCardID  INTEGER PRIMARY KEY AUTOINCREMENT
                          UNIQUE
                          NOT NULL,
    [User ID]     INTEGER NOT NULL
                          REFERENCES User ([User ID]),
    [Card number] INTEGER NOT NULL,
    [Expiry]        TEXT NOT NULL,
    [CVC]           INTEGER NOT NULL
);
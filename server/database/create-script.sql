CREATE TABLE Account (
    ID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    ProfilePicturePath VARCHAR(255) NULL,
    Bio VARCHAR(255) NULL
);

CREATE TABLE Friends (
    AccountID1 INTEGER,
    AccountID2 INTEGER,
    Account1Accepted bool,
    Account2Accepted bool,
    PRIMARY KEY (AccountID1, AccountID2),
    CONSTRAINT FK_Friends1
      FOREIGN KEY(AccountID1) 
	  REFERENCES Account(ID),
    CONSTRAINT FK_Friends2
      FOREIGN KEY(AccountID2) 
	  REFERENCES Account(ID)
);

CREATE TABLE Jam(
    ID SERIAL PRIMARY KEY,
    Creator INTEGER NOT NULL,
    PreJam INTEGER,
    ThumbnailPath VARCHAR(255),
    CreationDate date,
    CONSTRAINT FK_JamCreator
      FOREIGN KEY(Creator) 
	  REFERENCES Account(ID),
    CONSTRAINT FK_PreJam
      FOREIGN KEY(PreJam) 
	  REFERENCES Jam(ID)
);

CREATE TABLE Upvote(
    Account INTEGER,
    Jam INTEGER,
    PRIMARY KEY (Account, Jam),
    CONSTRAINT FK_UpvoteAccount
      FOREIGN KEY(Account) 
	  REFERENCES Account(ID),
    CONSTRAINT FK_UpvoteJam
      FOREIGN KEY(Jam) 
	  REFERENCES Jam(ID)
);

CREATE TABLE Comment(
    ID SERIAL PRIMARY KEY,
    Creator INTEGER NOT NULL,
    Jam INTEGER NOT NULL,
    Text VARCHAR(255) NOT NULL,
    CONSTRAINT FK_CommentCreator
      FOREIGN KEY(Creator) 
	  REFERENCES Account(ID),
    CONSTRAINT FK_CommentJam
      FOREIGN KEY(Jam) 
	  REFERENCES Jam(ID)
);

CREATE TABLE RawRecording(
    ID SERIAL PRIMARY KEY,
    RecordingPath VARCHAR(255) NOT NULL
);

CREATE TABLE RecordingInfos(
    ID SERIAL PRIMARY KEY,
    Jam INTEGER NOT NULL,
    Recording INTEGER NOT NULL,
    Volume DOUBLE PRECISION,
    Pan DOUBLE PRECISION,
    Bass DOUBLE PRECISION,
    Middle DOUBLE PRECISION,
    Treble DOUBLE PRECISION,
    CONSTRAINT FK_RecordingInfoJam
      FOREIGN KEY(Jam) 
	  REFERENCES Jam(ID),
    CONSTRAINT FK_RecordingInfoRecording
      FOREIGN KEY(Recording) 
	  REFERENCES RawRecording(ID)
);
insert into public."User" (id, name, "email") values (0, 'Admin', 'admin@guild-manager.com');

insert into public."Guild" (id, "userId", name, "primaryColor", "secondaryColor", badge, purse) values (0, 0, 'Free Agents', '#000000', '#ffffff', 0, 0);

insert into public."Region" (id, name) values ('0', 'Barodoun'), ('1', 'Pharule'), ('2', 'Sharo');

insert into public."Municipality" (id, name, locations, "regionId") values ('0','Bojun', '{"nearby woods", "watch tower", "coastline", "farm", "brewery"}', '0'), ('1', 'Rakta', '{"nearby woods","watch tower",coastline,farm,tavern,church,"abandon mansion"}', '1'), ('2', 'Victi', '{"nearby woods","watch tower",coastline,farm,tavern,church,"abandon mansion"}', '2'), ('3', 'Nabia', '{"nearby woods","watch tower",coastline,farm,tavern,church,"abandon mansion"}', '0'), ('4', 'Hogarto', '{"nearby woods","watch tower",coastline,farm,tavern,church,"abandon mansion"}', '1'), ('5', 'Aajro', '{"nearby woods","watch tower",coastline,farm,tavern,church,"abandon mansion"}', '2'), ('6', 'Mundun', '{"mouth of volcano","death woods","unholy church","sacrificial shrine",tavern}', '0');

insert into public."Quest" (id, "leagueQuest", location, name, "giver", "rewardGold", "municipalityId") values (0, false, 'Guild', 'Training', '', 0, 0);
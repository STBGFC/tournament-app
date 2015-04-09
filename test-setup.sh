#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Invoke with a URL prefix (no trailing /) and a username"
    echo "  i.e. $0 http://localhost:8080/tournament joeadmin"
    exit 1;
fi

echo -n "Password for $2: " 
read -s passwd
AUTH="Authorization: Basic $(echo -n "$2:$passwd" | base64)"
CONTENT_TYPE="Content-Type: application/json"
ACCEPT="Accept: application/json"
URL=$1

curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X PUT -d "{\"name\":\"Test Tournament\",\"description\":\"Test Tournament is our annual, post-season tournament for the benefit of old developers with nothing more to look forward to in life.  Please give generously.\", \"club\":\"STBGFC\",\"siteUrl\":\"https://www.stbgfc.co.uk\"}" ${URL}/api/tournament
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U8\", \"section\":\"A\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U8\", \"section\":\"B\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U9\", \"section\":\"A\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U9\", \"section\":\"B\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U10\",\"section\":\"A\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U10\",\"section\":\"B\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U11\",\"section\":\"A\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U11\",\"section\":\"B\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U12\",\"section\":\"A\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U13\",\"section\":\"A\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U14\",\"section\":\"A\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U15\",\"section\":\"A\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U15\",\"section\":\"Champions\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U15\",\"section\":\"Europa\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U16\",\"section\":\"A\"}" ${URL}/api/competition
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"name\":\"U18\",\"section\":\"A\"}" ${URL}/api/competition

curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"08:30\",\"homeTeam\":\"Sheff. Wed.\",\"awayTeam\":\"LA Tigers\",\"homeGoals\":0,\"awayGoals\":2, \"played\":true}"  ${URL}/api/result/U8/A/1
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"08:40\",\"homeTeam\":\"London Eagles\",\"awayTeam\":\"Sydney Arrows\",\"homeGoals\":2,\"awayGoals\":2, \"played\":true}"  ${URL}/api/result/U8/A/1
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"08:50\",\"homeTeam\":\"Sheff. Wed.\",\"awayTeam\":\"London Eagles\",\"homeGoals\":1,\"awayGoals\":2, \"played\":true}"  ${URL}/api/result/U8/A/1
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"09:00\",\"homeTeam\":\"LA Tigers\",\"awayTeam\":\"Sydney Arrows\",\"homeGoals\":3,\"awayGoals\":2, \"played\":true}"  ${URL}/api/result/U8/A/1

curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"08:50\",\"homeTeam\":\"John O'groats FC\",\"awayTeam\":\"Stoke City\",\"homeGoals\":1,\"awayGoals\":2, \"played\":true}"  ${URL}/api/result/U8/A/2
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"09:00\",\"homeTeam\":\"Brisbane Blacks\",\"awayTeam\":\"Swindon Town\",\"homeGoals\":3,\"awayGoals\":2, \"played\":true}"  ${URL}/api/result/U8/A/2
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"08:50\",\"homeTeam\":\"Stoke City\",\"awayTeam\":\"Brisbane Blacks\",\"homeGoals\":1,\"awayGoals\":1, \"played\":true}"  ${URL}/api/result/U8/A/2
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"09:00\",\"homeTeam\":\"Swindon Town\",\"awayTeam\":\"John O'groats FC\",\"homeGoals\":0,\"awayGoals\":0, \"played\":true}"  ${URL}/api/result/U8/A/2
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"08:50\",\"homeTeam\":\"John O'groats FC\",\"awayTeam\":\"Brisbane Blacks\",\"homeGoals\":0,\"awayGoals\":1, \"played\":true}"  ${URL}/api/result/U8/A/2
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"09:00\",\"homeTeam\":\"Stoke City\",\"awayTeam\":\"Swindon Town\",\"homeGoals\":3,\"awayGoals\":0, \"played\":true}"  ${URL}/api/result/U8/A/2
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"SF1\",\"homeTeam\":\"Sheff. Wed.\",\"awayTeam\":\"Stoke City\",\"homeGoals\":1,\"awayGoals\":1,\"homePens\":3,\"awayPens\":2, \"played\":true}"  ${URL}/api/result/U8/A
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"SF2\",\"homeTeam\":\"LA Tigers\",\"awayTeam\":\"Swindon Town\",\"homeGoals\":3,\"awayGoals\":0, \"played\":true}"  ${URL}/api/result/U8/A
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"Final\",\"homeTeam\":\"LA Tigers\",\"awayTeam\":\"Sheff. Wed.\",\"homeGoals\":2,\"awayGoals\":3, \"played\":true}"  ${URL}/api/result/U8/A

curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"08:50\",\"homeTeam\":\"Leeds Rhinos\",\"awayTeam\":\"Cardiff Reds\",\"homeGoals\":1,\"awayGoals\":2, \"played\":true}"  ${URL}/api/result/U8/B/1
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"09:00\",\"homeTeam\":\"London Royals\",\"awayTeam\":\"John O'groats Blue\",\"homeGoals\":3,\"awayGoals\":2, \"played\":true}"  ${URL}/api/result/U8/B/1
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"08:50\",\"homeTeam\":\"Cardiff Reds\",\"awayTeam\":\"London Royals\",\"homeGoals\":1,\"awayGoals\":3, \"played\":true}"  ${URL}/api/result/U8/B/1
curl -i -H"$AUTH" -H"$CONTENT_TYPE" -H "$ACCEPT" -X POST -d "{\"tag\":\"09:00\",\"homeTeam\":\"John O'groats Blue\",\"awayTeam\":\"Leeds Rhinos\",\"homeGoals\":4,\"awayGoals\":0, \"played\":true}"  ${URL}/api/result/U8/B/1

echo -e "\nDone."


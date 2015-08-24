#!/bin/bash
#
# Helper script (until app admin functionality evolves!) for populating a 
# second stage tournament by replacing placeholder team names with real
# teams once finishing positions are known in the groups.
#
# -------------------------------------------------------------------------

usage() {
    echo "Usage: $0 [mongo_db_name] [age_group] [group] [team_p1] <team_p2> .. <team_pN>"
    exit 1
}

[[ $# -gt 5 ]] || usage

mdb=$1
age=$2
grp=$3

shift 3
count=1

evalFile=$(mktemp)

while (( "$#" )); do
    target=${age}_G${grp}_P${count}
    echo Replacing $target with $1
    echo "db.results.update({\$or:[{homeTeam:\"$target\"},{homeTeam_o:\"$target\"}]},{\$set:{homeTeam: \"$1\",homeTeam_o:\"$target\"}},{multi: true});" >> $evalFile
    echo "db.results.update({\$or:[{awayTeam:\"$target\"},{awayTeam_o:\"$target\"}]},{\$set:{awayTeam: \"$1\",awayTeam_o:\"$target\"}},{multi: true});" >> $evalFile
    shift
    count=$(( count+1 ))
done

echo "Continue with replacement in db $mdb (y/N)?" 
read ans

if [[ "$ans" == "y" || "$ans" == "Y" ]]; then
    echo executing file..
    mongo $mdb $evalFile
else
    echo Aborting.
fi

#rm -f $evalFile


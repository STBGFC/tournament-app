#!/bin/bash

usage() {
        echo "Usage: $0 [name_of_mongodb] [name_of_json_file]"
        exit 1
}

[[ $# -eq 2 ]] || usage

mongoimport -d $1 -c results --file $2

#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
>$OUTPUT
dialog --backtitle "Zookin TUI" \
    --msgbox "Please select a dictionary file to generate a new tree from." 5 100 \
    --and-widget \
    --fselect "$(pwd)" $(($(tput lines) - 20)) $(($(tput cols) - 10)) 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)
case $CODE in
    0)
        # file entered
        zookin-wordtree -g "$MENU" --do-not-ask 2>&1 | ansifilter | dialog --backtitle "Zookin TUI" --programbox $(($(tput lines) - 10)) $(($(tput cols) - 10))
        exit 3
        ;;
    *)
        exit $CODE
        ;;
esac

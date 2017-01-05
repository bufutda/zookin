#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
>$OUTPUT
dialog --backtitle "Zookin TUI" \
    --msgbox "Please select a directory to export to." 5 100 \
    --and-widget \
    --dselect "$(pwd)" $(($(tput lines) - 20)) $(($(tput cols) - 10)) 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)
case $CODE in
    0)
        # file entered
        zookin-wordtree --export "$MENU" --do-not-ask 2>&1 | ansifilter | dialog --backtitle "Zookin TUI" --programbox $(($(tput lines) - 10)) $(($(tput cols) - 10))
        exit 3
        ;;
    *)
        exit $CODE
        ;;
esac

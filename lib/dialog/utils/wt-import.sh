#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
>$OUTPUT
dialog --backtitle "Zookin TUI" \
    --msgbox "Please select a wordtree file to import." 5 100 \
    --and-widget \
    --fselect "$(pwd)" $(($(tput lines) - 20)) $(($(tput cols) - 10)) 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)
case $CODE in
    0)
        # file entered
        zookin-wordtree --import "$MENU" --do-not-ask 2>&1 | ansifilter | dialog --backtitle "Zookin TUI" --programbox $(($(tput lines) - 10)) $(($(tput cols) - 10))
        exit 3
        ;;
    *)
        exit $CODE
        ;;
esac

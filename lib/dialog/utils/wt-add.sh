#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
>$OUTPUT
dialog --backtitle "Zookin TUI" --nook --nocancel --inputbox "Word: " 8 100 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)
case $CODE in
    0)
        # word entered
        zookin-wordtree -a "$MENU" --do-not-ask 2>&1 | ansifilter | dialog --backtitle "Zookin TUI" --programbox $(($(tput lines) - 10)) $(($(tput cols) - 10))
        exit 3
        ;;
    *)
        exit $CODE
        ;;
esac

#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
>$OUTPUT
dialog --backtitle "Zookin TUI" --nook --nocancel --inputbox "Word: " 8 100 2>$OUTPUT
CODE=$?
MENU=$(cat $OUTPUT)
case $CODE in
    0)
        # word entered
        zookin-wordtree -x "$MENU" --do-not-ask 2>&1 > /dev/null
        if [ $? -eq 0 ]; then
            dialog --backtitle "Zookin TUI" --msgbox "${MENU^^} is in the current word tree." 6 100
        else
            dialog --backtitle "Zookin TUI" --msgbox "${MENU^^} is not in the current word tree." 6 100
        fi
        exit 3
        ;;
    *)
        exit $CODE
        ;;
esac

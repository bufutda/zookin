#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
dialog --backtitle "Zookin TUI" --menu "Zookin | Utilities" 9 100 90 \
    "Score" "View the score of a string of text" \
    "Wordtree" "Generate a new wordtree based on a dictionary" \
 2>$OUTPUT
CODE=$?
MENU=$(<$OUTPUT)

case $CODE in
    0)
        # menu item selected
        case $MENU in
            "Score")
                eval "${DLG}utils/score.sh"
                ;;
            "Wordtree")
                eval "${DLG}utils/wordtree.sh"
                ;;
        esac
        ;;
    *)
        exit $CODE
        ;;
esac

#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
while true; do
    dialog --backtitle "Zookin TUI" --extra-button --extra-label "Return" --menu "Zookin | Utilities" 12 100 90 \
        "Score" "View the score of a string of text" \
        "Wordtree" "Generate a new wordtree based on a dictionary" \
        "Uppercase" "Make text uppercase" \
        "Lowercase" "Make text lowercase" \
        "Reverse" "Reverse text order" 2>$OUTPUT
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
                "Uppercase")
                    eval "${DLG}utils/uppercase.sh"
                    ;;
                "Lowercase")
                    eval "${DLG}utils/lowercase.sh"
                    ;;
                "Reverse")
                    eval "${DLG}utils/reverse.sh"
                    ;;
            esac
            CODE=$?
            if [ $CODE -eq 3 ]; then
                continue
            fi
            exit $CODE
            ;;
        *)
            exit $CODE
            ;;
    esac
done

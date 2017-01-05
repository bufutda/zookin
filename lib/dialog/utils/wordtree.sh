#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
while true; do
    dialog --backtitle "Zookin TUI" --extra-button --extra-label "Return" --menu "Zookin | Wordtree" 12 100 90 \
        "Generate" "Create a new wordtree from a file" \
        "Add" "Insert a word into the current tree" \
        "Exists" "Test whether a word is in the current tree" \
        "Export" "Export the current wordtree" \
        "Import" "Import a wordtree" 2>$OUTPUT
    CODE=$?
    MENU=$(<$OUTPUT)

    case $CODE in
        0)
            # menu item selected
            case $MENU in
                "Generate")
                    eval "${DLG}utils/wt-gen.sh"
                    ;;
                "Add")
                    eval "${DLG}utils/wt-add.sh"
                    ;;
                "Exists")
                    eval "${DLG}utils/wt-exists.sh"
                    ;;
                "Export")
                    eval "${DLG}utils/wt-export.sh"
                    ;;
                "Import")
                    eval "${DLG}utils/wt-import.sh"
                    ;;
            esac
            continue
            ;;
        *)
            exit $CODE
            ;;
    esac
done

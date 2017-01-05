#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
while true; do
    dialog --backtitle "Zookin TUI" --extra-button --extra-label "Return" --menu "Zookin | Zookin Web Service" 11 100 90 \
        "Start" "Start Zookin Web Service" \
        "Stop" "Stop Zookin Web Service" \
        "Status" "Get the status of Zookin Web Service" \
        "List Users" "List all users able to log in" 2>$OUTPUT
    CODE=$?
    MENU=$(<$OUTPUT)

    case $CODE in
        0)
            # menu item selected
            case $MENU in
                "Start")
                    eval "${DLG}zws/start.sh"
                    ;;
                "Stop")
                    eval "${DLG}zws/stop.sh"
                    ;;
                "Status")
                    eval "${DLG}zws/status.sh"
                    ;;
                "List Users")
                    eval "${DLG}zws/list.sh"
                    ;;
            esac
            continue
            ;;
        *)
            exit $CODE
            ;;
    esac
done

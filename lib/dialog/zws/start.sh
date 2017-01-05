#!/usr/bin/env bash
OUTPUT="/tmp/zookindialog.txt"
screen -ls | grep zws
if [ $? -eq 0 ]; then
    # already running
    dialog --backtitle "Zookin TUI" --msgbox "ZWS is already running." 5 100
    exit 3
fi
dialog --backtitle "Zookin TUI" --nook --no-cancel --separate-widget "	" \
    --begin 4 4 --inputbox "Port: " 8 100 "8069" \
    --and-widget \
    --begin 8 8 --menu "Zookin Web Service Protocol" 9 100 90 \
    "HTTP" "Do not encrypt traffic" \
    "HTTPS" "Encrypt traffic" 2>$OUTPUT
CODE=$?
MENU=$(<$OUTPUT)

IFS="	"
SWITCH=1
for i in $MENU; do
    if [ $SWITCH -eq 1 ]; then
        A=$i
        SWITCH=2
    else
        B=$i
    fi
done
unset IFS

case $CODE in
    0)
        # menu item selected
        case $B in
            "HTTP")
                screen -dmS zws zookin-zws --start -p "$A" --protocol "$B"
                screen -S zws -X hardcopydir "${DLG}zws/log"
                if [ $? -eq 0 ]; then
                    dialog --backtitle "Zookin TUI" \
                        --msgbox "Started Zookin Web Service on port $A ($B)." 5 100
                else
                    dialog --backtitle "Zookin TUI" \
                        --msgbox "An error occurred." 5 100
                fi
                ;;
            "HTTPS")
                dialog --backtitle "Zookin TUI" \
                    --msgbox "Please select an SSL Certificate file." 5 100 \
                    --and-widget \
                    --fselect "$(pwd)" $(($(tput lines) - 20)) $(($(tput cols) - 10)) 2>$OUTPUT
                CODE=$?
                C=$(<$OUTPUT)
                if [ $CODE -eq 0 ]; then
                    dialog --backtitle "Zookin TUI" \
                        --msgbox "Please select an SSL Key file." 5 100 \
                        --and-widget \
                        --fselect "$C" $(($(tput lines) - 20)) $(($(tput cols) - 10)) 2>$OUTPUT
                    CODE=$?
                    D=$(<$OUTPUT)
                    if [ $CODE -eq 0 ]; then
                        screen -dmS zws zookin-zws --start -p "$A" --protocol "$B" --cert "$C" --key "$D"
                        screen -S zws -X hardcopydir "${DLG}zws/log"
                        if [ $? -eq 0 ]; then
                            dialog --backtitle "Zookin TUI" \
                                --msgbox "Started Zookin Web Service on port $A ($B)." 5 100
                        else
                            dialog --backtitle "Zookin TUI" \
                                --msgbox "An error occurred." 5 100
                        fi
                    else
                        exit $CODE
                    fi
                else
                    exit $CODE
                fi
                ;;
        esac
        exit $CODE
        ;;
    *)
        exit $CODE
        ;;
esac

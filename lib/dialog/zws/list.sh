#!/usr/bin/env bash
zookin-zws --list-users | ansifilter | dialog --backtitle "Zookin TUI" --programbox 5 100
exit 3

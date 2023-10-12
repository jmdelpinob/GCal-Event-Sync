# GCal-Event-Sync

Synchronize your Google Calendar events seamlessly with Google Apps Script.

## Description

`GCal-Event-Sync` is a Google Apps Script designed to synchronize events from a secondary Google Calendar to a primary one. It ensures that your availability is always accurately reflected in your primary calendar by creating blocks for busy events from a secondary calendar.

## Features

- **Selective Syncing**: Syncs only events marked as "busy" from the secondary calendar.
- **Privacy**: Events created in the primary calendar are marked as "private" and titled "Block" for privacy.
- **Auto Update**: Automatically updates, creates, or deletes events in the primary calendar based on changes in the secondary calendar.
- **Concurrency Management**: Utilizes Google Apps Script Lock Service to prevent concurrent executions from creating inconsistencies.

## Usage

### Setup Script in Google Apps Script
1. Navigate to [Google Apps Script](https://script.google.com/).
2. Click on “New Project” and give it a name.
3. Delete any code in the script editor and replace with the code from `sync.gs`.
4. Save the script with a suitable name.
   
### Set Trigger
1. In the Google Apps Script, click on the clock icon on the left panel to go to "Triggers".
2. Click on "+ Add Trigger" at the bottom-right.
3. Choose `sync` for the function to run.
4. Choose an event source (e.g., "Time-driven" to run at specific intervals).
5. Set up the type of time-driven trigger you want (e.g., every 5 minutes, or every hour).
6. Save the trigger.

### Customize
You might want to adjust the `id` variable in the script to match the secondary Google Calendar's ID that you wish to sync from.

## Notes
- **Exclusions**: Events in the secondary calendar starting with `#` will be excluded from syncing.
- **Single Events**: The script is configured to ignore all-day events or events spanning multiple days. This behavior can be modified in the script as per use-case.
- **Execution Limits**: Ensure that the script complies with [Google Apps Script's execution limits](https://developers.google.com/apps-script/guides/services/quotas).

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

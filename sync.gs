function sync() {
    var lock = LockService.getScriptLock();
    try {
        // Try to obtain the lock. Wait up to 60 seconds before timing out.
        if (!lock.tryLock(60000)) {
            Logger.log('Could not obtain lock, script execution terminated.');
            return; // Exit the function
        }

        var id = "youremail@gmail.com";  // Secondary calendar ID

        var today = new Date();
        var enddate = new Date();
        enddate.setDate(today.getDate() + 30);  // Sync range of 30 days

        var secondaryCal = CalendarApp.getCalendarById(id);
        var secondaryEvents = secondaryCal.getEvents(today, enddate);

        var primaryCal = CalendarApp.getDefaultCalendar();
        var primaryEvents = primaryCal.getEvents(today, enddate);

        var primaryEventTitle = "Block";
        
        // Clear out previously synced events in the primary calendar
        primaryEvents.forEach(priEvent => {
            if (priEvent.getTitle() === primaryEventTitle) {
                priEvent.deleteEvent();
            }
        });

        // For each secondary event, create a corresponding event in the primary calendar
        secondaryEvents.forEach(secEvent => {
            if (secEvent.getTitle().startsWith("#") || secEvent.isAllDayEvent()) {
                return;  // Skip excluded events
            }
            
            let newEvent = primaryCal.createEvent(primaryEventTitle, secEvent.getStartTime(), secEvent.getEndTime());
            newEvent.setVisibility(CalendarApp.Visibility.PRIVATE);
            newEvent.removeAllReminders();
        });

    } catch (e) {
        // If there's an issue obtaining the lock or any other error, log it
        Logger.log('Error during script execution: ' + e.toString());
    } finally {
        // Always release the lock at the end
        lock.releaseLock();
    }
}

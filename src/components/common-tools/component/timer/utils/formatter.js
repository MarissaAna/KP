/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Saturday, April 27th 2024, 12:52:16 pm
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 */

/**
 * Formats a number to a two-digit string.
 *
 * @param {number} number - The number to format.
 * @returns {string} The formatted two-digit string.
 */
export const formatToTwoDigits = (number) => {
  return number < 10 ? "0" + number : number.toString();
};
/**
 * Calculates the estimated milliseconds from the current time based on the provided hours, minutes, and seconds.
 *
 * @param {number} hours - The number of hours.
 * @param {number} minutes - The number of minutes.
 * @param {number} seconds - The number of seconds.
 * @returns {Object} - An object containing the estimated milliseconds and the current milliseconds.
 */
export const millisecondsFromNow = (hours, minutes, seconds) => {
  hours = Number(hours);
  minutes = Number(minutes);
  seconds = Number(seconds);

  const currentMillis = new Date().getTime();

  const inputMillis = (hours * 3600 + minutes * 60 + seconds) * 1000;
  const estimatedMillis = currentMillis + inputMillis;

  return {
    estimatedMillis,
    currentMillis,
  };
};

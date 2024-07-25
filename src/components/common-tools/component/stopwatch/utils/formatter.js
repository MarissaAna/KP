/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Friday, April 26th 2024, 13:59:16 pm
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 * Co-Author: Annisa Nailiya Zahroh | annisanailiyazahroh02@gmail.com <https://github.com/annisanailiya>
 *
 */

/**
 * Formats a number to a two-digit string.
 *
 * @param {number} number - The number to format.
 * @returns {string} The formatted two-digit string.
 */
export const formatToTwoDigits = (number) => {
  if (number === undefined || number === null) {
    return "00";
  }
  return number < 10 ? "0" + number : number.toString();
};

export const formatMilisecond = (countDown, currentTime) => {
  const distance = countDown - currentTime;
  const seconds = Math.floor(distance / 1000) % 60;
  const minutes = Math.floor(distance / (1000 * 60)) % 60;
  const hours = Math.floor(distance / (1000 * 60 * 60));

  return {
    hours,
    minutes,
    seconds,
  };
};

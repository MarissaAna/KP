/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Tuesday, April 25th 2024, 15:25:18 pm
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 * Co-Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 * Co-Author: Rizki Rifani | rizkirifandi7@gmail.com <https://gitea.len-iot.id/rizki.rifani.e>
 *
 */

/**
 * Formats a number by adding commas for thousands separator.
 *
 * @param {string} num - The number to be formatted.
 * @returns {string} The formatted number.
 */
const formatNumber = (num) => {
  if (num.includes(".")) return num;
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const isNumeric = (str) => {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
};

/**
 * Formats a binary number by adding spaces every four digits.
 *
 * @param {string} num - The binary number to be formatted.
 * @return {string} The formatted binary number.
 */
const formatBinary = (num) => {
  num = num.replace(/^-?0b/, "");
  return num.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
};

/**
 * Formats a hexadecimal number by adding spaces every four digits.
 *
 * @param {string} num - The hexadecimal number to be formatted.
 * @return {string} The formatted hexadecimal number.
 */
const formatHex = (num) => {
  num = num.replace(/^-?0X/, "");
  if (num.length > 16) {
    num = num.substring(0, 16);
  }

  num = num.split("").reverse().join("");
  num = num.replace(/(.{4})/g, "$1 ");
  return num.split("").reverse().join("").trim();
};

/**
 * Formats a octal number by adding spaces every three digits.
 *
 * @param {string} num - The octal number to be formatted.
 * @return {string} The formatted octal number.
 */
const formatOctal = (num) => {
  num = num.replace(/^-?0o/, "");
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const formatValue = (type, value) => {
  if (type === "BIN" || type === "bin") {
    return formatBinary(value);
  } else if (type === "OCT" || type === "oct") {
    return formatOctal(value);
  } else if (type === "HEX" || type === "hex") {
    return formatHex(value);
  } else {
    return formatNumber(value);
  }
};

export {
  formatNumber,
  isNumeric,
  formatBinary,
  formatHex,
  formatOctal,
  formatValue,
};

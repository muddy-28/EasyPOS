import moment from 'moment'

export function hexToRgba(rgb, alpha) {
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(rgb)){
      c = rgb.substring(1).split('');
      if (c.length == 3){
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ")";
  }
  throw new Error('Bad Hex');
}

export function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R < 255) ? R : 255;  
  G = (G < 255) ? G : 255;  
  B = (B < 255) ? B : 255;  

  var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
}

export function cc_format(value) {
  var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  var matches = v.match(/\d{4,16}/g);
  var match = matches && matches[0] || ''
  var parts = []

  for (i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
      return parts.join(' ')
  } else {
      return value
  }
}

export function ce_format(value) {
  return value.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/' // To handle 3/ > 03/
  ).replace(
    /^(0[1-9]{1}|1[0-2]{1})$/g, '$1/' // 11 > 11/
  ).replace(
    /^([0-1]{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^(\d)\/(\d\d)$/g, '0$1/$2' // To handle 1/11 > 01/11
  ).replace(
    /^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^([0]{1,})\/|[0]{1,}$/g, '0' // To handle 0/ > 0 and 00 > 0
  ).replace(
    /[^\d\/]|^[\/]{0,}$/g, '' // To allow only numbers and /
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 /
  );
}

export function splitDateTime(dateTime) {
  if (!dateTime) return {};

  let arr = dateTime.split('  ');
  let date = arr[0];
  let time = arr[1];
  String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  }
  date = moment(new Date(date)).format("dddd, DD MMM YYYY");
  time = time.splice(5, 0, ' ');
  return { date, time }
}

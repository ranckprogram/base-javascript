export function createRect(ctx, x, y, w, h, item, radius) {
  radius = radius || 0;
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, Math.PI, (Math.PI * 3) / 2);
  ctx.lineTo(w - radius + x, y);
  ctx.arc(w - radius + x, radius + y, radius, (Math.PI * 3) / 2, Math.PI * 2);
  ctx.lineTo(w + x, h + y - radius);
  ctx.arc(w - radius + x, h - radius + y, radius, 0, (Math.PI * 1) / 2);
  ctx.lineTo(radius + x, h + y);
  ctx.arc(radius + x, h - radius + y, radius, (Math.PI * 1) / 2, Math.PI);
  ctx.closePath();
  ctx.fillStyle = item.color
    ? item.color.bgColor
      ? item.color.bgColor
      : "rgba(91,155,213,0.5)"
    : "white"; //背景颜色
  ctx.fill();
  ctx.strokeStyle = item.color
    ? item.color.borderColor
      ? item.color.borderColor
      : "#5B9BD5"
    : "#5B9BD5"; //边框颜色
  if (item.text) {
    ctx.font = "normal 14px 微软雅黑";
    ctx.fillStyle = item.color
      ? item.color.fontColor
        ? item.color.fontColor
        : "#5B9BD5"
      : "#5B9BD5"; //文字颜色
    ctx.textAlign = "center";
    ctx.fillText(item.text, x + w / 2, y + h / 2 + 6);
  }
  ctx.stroke();
}

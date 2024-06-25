export const PermissionMap = {
  // 查看数据库中的隐藏字段
  DB_SHOW_HIDDEN_FIELD: 0x1,
};

export function checkPermission(userPermission: number, needPermission?: number | number[]) {
  if (!needPermission) return true;
  let permission = 0b0;
  if (Array.isArray(needPermission)) needPermission.forEach((item) => (permission |= item));
  else permission = needPermission;
  return (userPermission & permission) === permission;
}

export function formatPermission(...perms: number[]) {
  return perms.reduce((prev, cur) => prev | cur, 0b0);
}

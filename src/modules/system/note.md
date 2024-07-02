# 数据库设计

## 表关系

- 用户表 (user)
- 角色表 (role)
- 权限表 (permission)
- 组织表 (organization)

organization (1) -> role (M)
organization (1) -> user (M)
user (1) -> organization (M)
user (1) -> role (M)
user (1) -> permission (M)
role (1) -> permission (M)

## 需求

可以修改用户权限和角色, 可以修改角色权限
权限优先级: permission -> role
不同组中的角色相互隔离, 不同组中的相同用户无法共享权限
可以单独设置用户权限, 也就是说用户的角色和权限都生效

## 基本字段

- id
- createTime
- updateTime
- isDeleted
- deleteTime
- deleteBy

## 用户表

### 字段

- name
- password
- email
- phone
- avatar
- fingerprint
- cur_org_id

## 角色表

### 字段

- name
- description
- org_id

## 权限表

### 字段

- name
- description
- code

## 组织表

### 字段

- name
- description

export function useForms() {
  const formTableColumns = [
    {
      value: 'name',
      label: 'Name',
    },
    {
      value: 'event.name',
      label: 'Event',
    },
    {
      value: 'isActive',
      label: 'Status',
    },
    {
      value: 'createdAt',
      label: 'Created At',
    },
    {
      value: 'updatedAt',
      label: 'Updated At',
    },
    {
      value: 'action',
      label: 'Action',
    },
  ]

  const formRolesPermission = [
    RoleType.Admin,
    RoleType.BoardOfDirector,
    RoleType.Board,
  ];

  return { formTableColumns, formRolesPermission };
}
import { faker } from "@faker-js/faker";
import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { IconButton, MaterialReactTable, MRT_ColumnDef, Tooltip } from "ui";

interface IProps {
  children?: ReactNode;
}

// 车型配置
const VehicleType: FC<IProps> = () => {
  const columns: MRT_ColumnDef<(typeof data)[0]>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
  ];

  const data = [...Array(5)].map(() => ({
    address: faker.location.streetAddress(),
    age: faker.number.int(80),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
  }));
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        renderTopToolbarCustomActions={() => {
          const handleCreateNewUser = () => {
            prompt("Create new user modal");
          };

          return (
            <div>
              <Tooltip title="Create New User">
                <IconButton onClick={handleCreateNewUser}></IconButton>
              </Tooltip>
            </div>
          );
        }}
      />
    </>
  );
};

export default memo(VehicleType);

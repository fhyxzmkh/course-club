import { Button, List } from "antd";

export const DeleteResource = (props) => {
  const handleDelete = (res) => {
    const updatedResources = props.resource.filter(
      (resource) => resource !== res,
    );

    props.setResource(updatedResources);
  };

  return (
    <>
      <div className="w-1/2 mx-auto overflow-y-auto bg-white  mt-4">
        <List
          header={<p className="font-bold text-center">其它资源列表</p>}
          bordered
          dataSource={props.resource}
          renderItem={(res) => (
            <List.Item className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{res.name}</span>
                <p>{res.url}</p>
              </div>
              <Button
                color="danger"
                variant="outlined"
                className="ml-auto"
                onClick={() => handleDelete(res)}
              >
                Delete
              </Button>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

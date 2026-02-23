import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// ⚠️ tu devras créer ce slice
import {
  addNewCategory,
  deleteCategory,
  editCategory,
  fetchAllCategories,
} from "@/store/admin/category-slice";

const initialFormData = {
  image: null,
  nameCat: "",
};

function AdminCategory() {
  const [openCreateCategoryDialog, setOpenCreateCategoryDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { categoryList } = useSelector((state) => state.adminCategory);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editCategory({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllCategories());
            setFormData(initialFormData);
            setOpenCreateCategoryDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewCategory({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllCategories());
            setOpenCreateCategoryDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Category added successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentCategoryId) {
    dispatch(deleteCategory(getCurrentCategoryId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllCategories());
      }
    });
  }

  function isFormValid() {
    return formData.nameCat !== "";
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateCategoryDialog(true)}>
          Add New Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categoryList && categoryList.length > 0
          ? categoryList.map((categoryItem) => (
              <div
                key={categoryItem._id}
                className="border p-4 rounded-lg"
              >
                <img
                  src={categoryItem.image}
                  alt={categoryItem.nameCat}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="mt-2 font-semibold">
                  {categoryItem.nameCat}
                </h3>

                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFormData(categoryItem);
                      setCurrentEditedId(categoryItem._id);
                      setOpenCreateCategoryDialog(true);
                    }}
                  >
                    Edit
                  </Button>

             <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        Are you absolutely sure?
      </AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently
        delete this category.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={() => handleDelete(categoryItem._id)}
      >
        Continue
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
                </div>
              </div>
            ))
          : null}
      </div>

      <Sheet
        open={openCreateCategoryDialog}
        onOpenChange={() => {
          setOpenCreateCategoryDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null
                ? "Edit Category"
                : "Add New Category"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null ? "Edit" : "Add"
              }
              formControls={[
                {
                  label: "Category Name",
                  name: "nameCat",
                  componentType: "input",
                  type: "text",
                  placeholder: "Enter category name",
                },
              ]}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminCategory;
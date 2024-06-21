import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RiMapPin2Fill } from "@remixicon/react";
import { useToast } from "./ui/use-toast";
import useSWR from "swr";
import useDebounce from "@/hooks/use-debounce";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import axios from "axios";

interface PostLocationDialogProps {
  children: React.ReactNode;
}

function PostLocationDialog({ children }: PostLocationDialogProps) {
  const [search, setSearch] = React.useState("");
  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { toast } = useToast();

  const debouncedValue = useDebounce(search, 500);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios
          .post(
            `https://geokeo.com/geocode/v1/reverse.php?lat=${position.coords.latitude}&lng=${position.coords.longitude}&api=83329523f93b1b0d8159dd61159df112`
          )
          .then((res) => {
            setLocations(res.data.results);
          })
          .catch((err) => {
            toast({
              title: "Failed to get location information",
              description: "Error: " + err.message,
              variant: "destructive",
            });
          });
      },
      (err) => {
        toast({
          title: "Failed to get location",
          description: "Error: " + err.message,
          variant: "destructive",
        });
        console.log(err);
      }
    );
  };

  console.log("Locations", locations);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Choose Location</DialogTitle>
        <DialogDescription>Choose a location for your post</DialogDescription>
        <div className="my-2">
          <div className="flex items-center gap-x-2 my-2">
            <Input
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              placeholder="Choose a location"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={getUserLocation} variant="ghost" size="icon">
                    <RiMapPin2Fill className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Get your current location
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="w-full min-h-72">{JSON.stringify(locations)}</div>

          <Button className="w-full">Add Location</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostLocationDialog;

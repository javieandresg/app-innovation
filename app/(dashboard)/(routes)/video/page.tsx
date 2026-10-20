"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Empty } from "@/components/empty";
import { Heading } from "@/components/heading";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useProModal from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";
import { formSchema } from "./constants";

const suggestions = [
  "Aerial view of a tropical beach at sunset, cinematic",
  "A person dancing in a neon-lit city street at night",
  "Time-lapse of a delicious meal being prepared in a kitchen",
  "Motivational athlete running through a misty forest at dawn",
];

const VideoPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [video, setVideo] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo("");
      const response = await axios.post("/api/video", values);
      setVideo(Array.isArray(response.data) ? response.data[0] : response.data);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Transform your ideas into short video clips for TikTok, Reels and YouTube Shorts."
        icon={Video}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        {/* Suggestions */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => form.setValue("prompt", s)}
                className="text-xs px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 transition cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      {...field}
                      placeholder="e.g. Aerial view of a tropical beach at sunset, cinematic..."
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isLoading && <Empty label="Start typing to generate videos." />}
          {video && (
            <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;

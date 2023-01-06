import { Heading } from "components/Heading";
import { Image } from "components/Image";
import { AuthorDetails } from "features/authors/component/AuthorDetails";
import { Tags } from "features/tags/components/Tags";
import dynamic from "next/dynamic";
import { EntryFragment } from "src/types";
import { transformHtml } from "utils/content";

const UserDateTime = dynamic(() => import("components/DateTime"), {
  loading: () => <p>...</p>,
  ssr: false,
});

interface EntryProps {
  entry: EntryFragment;
}

export const Entry = ({ entry }: EntryProps) => {
  const { title, content, tags, publishedAt, author, image } = entry;

  return (
      <article aria-describedby="title">
        {image?.data?.attributes && <Image image={image.data.attributes} />}
        <Heading id="title" as="h2">
          {title}
        </Heading>
        <div>
          {tags?.data && <Tags tags={tags.data} />}
          <UserDateTime dateTime={publishedAt} />
        </div>
        {content && <div dangerouslySetInnerHTML={{ __html: transformHtml(content) }} />}
        {author?.data?.attributes && <AuthorDetails author={author.data?.attributes} />}
      </article>
  );
};
import NotFound from '@/app/not-found';
import MovieShow from './MovieShow';

export type Slug = {
  params: {
    slug: string;
  };
};

const fetchMovie = async (createDts: string, listCount: string) => {
  const res = await fetch(
    `http://localhost:3000/api?createDts=${createDts}&listCount=${listCount}`,
    { cache: 'no-cache' }
  );
  return res.json();
};

export interface Movie {
  title: string;
  prodYear: string;
  nation: string;
  company: string;
  runtime: string;
  rating: string;
  genre: string;
  releaseDate: string;
  posterUrl: string;
  stillUrl: string;
  directors: {
    director: {
      directorNm: string;
    }[];
  };
  actors: {
    actor: {
      actorNm: string;
    }[];
  };
  staffs: {
    staff: {
      staffNm: string;
      staffRoleGroup: string;
    }[];
  };
  plots: {
    plot: {
      plotText: string;
    }[];
  };
  vods: {
    vod: {
      vodUrl: string;
    }[];
  };
}

export type MoviePartial = Partial<Movie>;

export default async function Page({ params }: Slug) {
  const year = params.slug;
  const data = await fetchMovie('2023', '500');
  const filterList = data.filter((el: MoviePartial) => {
    return (
      el.genre !== '에로' &&
      el.directors?.director.length !== 0 &&
      el.genre?.length !== 0
    );
  });
  return <MovieShow props={filterList} />;
}

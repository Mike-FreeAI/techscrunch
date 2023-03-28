<script lang="ts">
	import GridArticles from '$lib/components/GridArticles.svelte';
	import { Query } from 'appwrite';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="category-main u-margin-block-start-40">

	<header class="category-main-header">
    <div class="u-flex u-gap-32">
      <div class="u-stretch">
        <h1 class="writer-name">{data.author.name}</h1>
        <h6 class="writer-profession">Reporter</h6>
      </div>
      <div>
        <img class="u-block" width="200" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABAAEADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+qF9q0NnlB+8l/ug9PrSatf/AGO3Cof3r8D2HrXLEliSTknqTQBen1i8mPEnlr6Jx+tVWuJ3+9NIfqxqKigCVbmdPuzSD6MatwazeQnl/MX0cZ/Ws+igDrLHVIb35R8kv9w9/pV6uGVijBlJBHII7V1el33222+b/Wpw3v70AYGqzmfUJT2Q7R+FUqdI2+RmPUkmm0AKASQAMk10lnokEcQa4XzJCOQTwK563cR3Ebt0VgT+ddqrBlDKcgjIIoAyb7RIXiZ7ZdkgGdoPDVzldw7rGjOxwqjJNcTKweV3AwGYnFADav6POYNRQfwyfKf6frVCpbdtlzE3o4P60AMddkjKexIptXdVgMGoSjsx3D8arQwSXEojiUsxoAjq7a6rc2ibFYMnZWGcVr2mhQxANcHzH9P4R/jWkkEMYwkSL9FAoA5W71S5vF2OwVP7qjANU67Z7eGUYeJG+qisu80KKQFrY+W3908g/wCFAHO1JbruuYl9XA/WklieGQxyKVYdQauaPAZ9RjP8KfOfw/8Ar0AbWr2Bu4A8Y/ex9PcelY+l362EzLKnytwTjla6ms6+0iG7JdT5cvqBwfrQBeimjnQPE4dfUGn1yz6dqFm+6NX/AN6I0DUtTi4Lvx/eT/61AHU1HNPFbpvlcIvvXNHUdTm+UPJ/wFMfyFCaZf3j7pFYf7Up/wAmgBupXg1C5Xy48BeF45atzSrH7HbZcfvX5b29qLHSobPDn95L/ePb6VfoA//Z" alt="">
      </div>
    </div>
    <p class="u-margin-block-start-20">Kyle Wiggers is a senior reporter at TechCrunch with a special interest in artificial intelligence. His writing has appeared in VentureBeat and Digital Trends, as well as a range of gadget blogs including Android Police, Android Authority, Droid-Life, and XDA-Developers. He lives in Brooklyn with his partner, a piano educator, and dabbles in piano himself occasionally -- if mostly unsuccessfully.</p>
	</header>

  <GridArticles queries={[Query.equal('authorId', data.author.id)]} initData={data.articles} />
</section>

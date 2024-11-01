import { useQueryTags } from "@/features/tag/api"
import { useTag } from "@/features/tag/model/useTag.ts"
import { usePage } from "@/pages/model/usePage.ts"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import { Search } from "lucide-react"
import { useState } from "react"

export function PostActionBar() {
  const { selectedTag, setSelectedTag } = useTag()
  const { searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder } = usePage()
  const { tags } = useQueryTags()

  const [searchInput, setSearchInput] = useState(searchQuery)

  // 게시물 검색
  function handleSearchPosts() {
    setSearchQuery(searchInput)
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearchPosts()}
          />
        </div>
      </div>

      <Select value={selectedTag} onValueChange={setSelectedTag}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}